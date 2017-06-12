<?php
/**
 * SpecialPage for SemanticOLAP extension
 *
 * @file
 * @ingroup Extensions
 */

class SemanticOLAPSpecial extends SpecialPage {
	public function __construct() {
		parent::__construct( 'SemanticOLAP', 'editinterface' );
	}


	/**
     * Override the parent to set where the special page appears on Special:SpecialPages
     * 'other' is the default. If that's what you want, you do not need to override.
     * Specify 'media' to use the <code>specialpages-group-media</code> system interface message, which translates to 'Media reports and uploads' in English;
     * 
     * @return string
     */
    function getGroupName() {
        return 'smw_group';
    }


	/**
	 * Show the page to the user
	 *
	 * @param string $sub The subpage string argument (if any).
	 *  [[Special:HelloWorld/subpage]].
	 */
	public function execute( $sub ) {

		$out = $this->getOutput();

		$out->setPageTitle( $this->msg( 'so-special-title' ) );
        $installForm = HTMLForm::factory( 'ooui', [], $this->getContext(), 'install-form' );

	//	$out->addWikiMsg( 'annotator-special-intro' );

      //  $out->addWikiText( '== '.$this->msg( 'category-pageform-assignment' ).' ==' );
        $out->addWikiMsg( 'so-special-description' );
    
        $btnSubmit = new OOUI\ButtonWidget( array(
                'infusable' => true,
                'id' => 'submit-btn',
                'label' => ''.$this->msg( 'so-button-submit' ).'',
            ) );
        $btnSelectData = new OOUI\ButtonWidget( array(
                'infusable' => true,
                'id' => 'selectData-btn',
                'label' => ''.$this->msg( 'so-button-selectData' ).'',
            ) );
        
        
                $out->addHTML("
        </br><div id='splashscreen'>
    <label for='id_label_multipleCategory'>
        ".$this->msg( 'so-category-selection' )."</br>
        <select id='checkboxCategory' class='js-example-basic-multiple' multiple='multiple' style='width: 564px'></select>
    </label></br>
    </br>
    <label for='id_label_multipleProperty'>
        ".$this->msg( 'so-property-selection' )."</br>
        <select id='checkboxProperty' class='js-example-basic-multiple' multiple='multiple' style='width: 564px'></select>
    </label></br>
    </br>
        ");
        $out->addHTML($btnSubmit);
        $out->addHTML("
    </div>
    <div id='main' style='display: none;'>
        ");
        $out->addHTML($btnSelectData);
        $out->addHTML("
        <div id='rr' style='padding: 7px;'></div>
        <div id='export' style='padding: 7px;'></div>
    </div>");

        $out->addModules( 'ext.SemanticOLAP.special' );

	}
}
